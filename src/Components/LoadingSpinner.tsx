import { Loader } from "lucide-react";

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <Loader className="w-8 h-8 animate-spin text-purple-600" />
    <span className="ml-2 text-gray-600">Loading spells...</span>
  </div>
);

export default LoadingSpinner;
