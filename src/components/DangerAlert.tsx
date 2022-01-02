

export const DangerAlert = (alert: any) => { 
    if(!alert) {
      return <div>s</div>
    }
    return (
    <div className="alert alert-danger" role="alert">
      {alert}
    </div>)
  }