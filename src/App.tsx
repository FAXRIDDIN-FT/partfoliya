import { Suspense } from "react";
import MainRouter from "./pages";
import { Loader2 } from "lucide-react";

const App = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-slate-100">
      <Suspense fallback={<Loading />}>
        <MainRouter />
      </Suspense>
    </div>
  );
};
const Loading = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Loading movies...
        </p>
      </div>
    </div>
  );
};

export default App;
