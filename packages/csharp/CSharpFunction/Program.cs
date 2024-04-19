using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
var app = builder.Build();

app.MapGet("/books/best", async () => {
    System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();

    var response = await client.GetAsync("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=BhB8WK2k4oLH1gPKfKg7s3hrPg4IPm0m");


    var jsonResponse = await response.Content.ReadAsStringAsync();
    var jsonDocument = System.Text.Json.JsonDocument.Parse(jsonResponse);
    var results = jsonDocument.RootElement.GetProperty("results").GetProperty("books").ToString();
   
    return Results.Json(results);
});

app.MapGet("/books/{title}", async (string title) => {
    System.Net.Http.HttpClient client = new System.Net.Http. HttpClient();
    
    var queryParams = System.Net.WebUtility.UrlEncode(title);
    var response = await client.GetAsync($"https://www.googleapis.com/books/v1/volumes?startIndex=0&maxResults=5&q={queryParams}");

    if (response.IsSuccessStatusCode)
    {
        var jsonResponse = response.Content.ReadAsStringAsync().Result;
        var jsonDocument = System.Text.Json.JsonDocument.Parse(jsonResponse);
        var json = jsonDocument.RootElement.GetProperty("items").ToString();
        return Results.Json(json);
    }

    return Results.Problem("Failed to fetch books", statusCode: (int)response.StatusCode);
});

app.Run();
