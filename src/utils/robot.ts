const mapStatus = (status: string) => {
  switch (status) {
    case 'not running':
      return 'Not Running';
    case 'stopped':
      return 'Not Running';
    case 'pending':
      return 'Pending';
    case 'stopping':
      return 'Stopping';
    case 'running':
      return 'Running';
    case 'setup':
      return 'Setup'
    case 'executing':
      return 'Executing'
    case 'cooldown':
      return 'Cooldown'
    default:
      return 'Not running';
  }
};

const mapStatusColor = (status: string) => {
  switch (status) {
    case 'not running':
      return 'gray';
    case 'setup':
      return 'blue';
    case 'running':
    case 'executing':
      return 'green';
    case 'cooldown':
      return 'orange'
    case 'pending':
      return 'yellow';
    case 'stopping':
      return 'red';
    default:
      return 'gray';
  }
};

export { mapStatus, mapStatusColor };
