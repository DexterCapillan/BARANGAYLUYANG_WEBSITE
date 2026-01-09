// src/components/ui/Button.jsx
export function Button({ children, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-blue-700 text-white hover:bg-blue-800",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  
  return (
    <button className={`px-4 py-2 rounded-lg font-medium transition ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
