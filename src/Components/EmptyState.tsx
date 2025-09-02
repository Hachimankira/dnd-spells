import { Book } from "lucide-react";

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
    <Book className="w-16 h-16 mb-4 text-gray-300" />
    <p className="text-lg font-medium">{message}</p>
  </div>
);

export default EmptyState;
