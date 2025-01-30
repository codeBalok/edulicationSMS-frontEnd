import { toast } from 'react-toastify';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaExclamationTriangle 
} from 'react-icons/fa';

const ToastContent = ({ type, title, message }) => (
  <div className="toast-content">
    <div className="toast-icon">
    </div>
    <div className="toast-message">
      <h4 className="toast-title">{title}</h4>
      <p className="toast-text">{message}</p>
    </div>
  </div>
);

export const showToast = (type, title, message) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: `custom-toast ${type}`,
  };

  switch (type) {
    case 'success':
      toast.success(<ToastContent type={type} title={title} message={message} />, toastOptions);
      break;
    case 'error':
      toast.error(<ToastContent type={type} title={title} message={message} />, toastOptions);
      break;
    case 'warning':
      toast.warning(<ToastContent type={type} title={title} message={message} />, toastOptions);
      break;
    default:
      toast(<ToastContent type={type} title={title} message={message} />, toastOptions);
  }
};