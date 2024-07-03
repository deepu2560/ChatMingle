import "./App.css";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen dark:bg-black">
      <h1 className="font-bold text-4xl text-black dark:text-white">
        Hello World
      </h1>
      <button
        className="bg-blue-600 text-white border-none outline-none mt-5 py-5 px-10 rounded-lg text-xl"
        onClick={() => {
          document.body.classList.toggle("dark");
        }}
      >
        Change Theme
      </button>
    </div>
  );
}

export default App;
