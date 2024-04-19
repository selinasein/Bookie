export default function NoData({ message }: { message: string }) {
  return (
    <div className="md:col-span-2 lg:col-span-3 rounded-lg bg-gray-100 border border-gray-200 p-4 flex items-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-gray-500"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
      </svg>
      <div className="text-sm font-medium text-gray-500">{message}</div>
    </div>
  );
}
