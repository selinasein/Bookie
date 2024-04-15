using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
var app = builder.Build();

// app.MapGet("/mynewcsfunc", () => {
//     return Results.Json(new {message = "Hi, Selina!" });
// });

// app.MapGet("/abc", () => {
//     return Results.Json(new {message = "Hi, abc!" });
// });

app.MapGet("/books/best", async () => {
    System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();

      var response = await client.GetAsync("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=BhB8WK2k4oLH1gPKfKg7s3hrPg4IPm0m");

     var JsonResult = await response.Content.ReadAsStringAsync();
   
    return Results.Json(JsonResult);
});

app.MapGet("/books/{title}", async (string title) => {
    System.Net.Http.HttpClient client = new System.Net.Http. HttpClient();
    
    var queryParams = System.Net.WebUtility.UrlEncode(title);
    var response = await client.GetAsync($"https://www.googleapis.com/books/v1/volumes?startIndex=0&maxResults=3&q={queryParams}");

    if (response.IsSuccessStatusCode)
    {
        var json = response.Content.ReadAsStringAsync().Result;
        return Results.Json(json);
    }

    return Results.Problem("Failed to fetch books", statusCode: (int)response.StatusCode);
});

app.Run();
