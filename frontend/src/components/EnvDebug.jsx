function EnvDebug() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#000', 
      color: '#fff', 
      padding: '10px', 
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>API URL: {import.meta.env.VITE_API_URL}</div>
      <div>Mode: {import.meta.env.MODE}</div>
    </div>
  );
}

export default EnvDebug;