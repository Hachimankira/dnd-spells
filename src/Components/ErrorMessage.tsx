import { AlertCircle } from "lucide-react";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center py-8 text-red-600">
    <AlertCircle className="w-6 h-6 mr-2" />
    <span>{message}</span>
  </div>
);

export default ErrorMessage;
