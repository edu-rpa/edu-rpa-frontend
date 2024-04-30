const mapStatus = (status: string) => {
  switch (status) {
    case 'not running':
      return 'not running';
    case 'stopped':
      return 'not running';
    case 'pending':
      return 'pending';
    case 'stopping':
      return 'stopping';
    case 'running':
      return 'running';
    default:
      return 'not running';
  }
};

const mapStatusColor = (status: string) => {
  switch (status) {
    case 'not running':
      return 'gray';
    case 'running':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'stopping':
      return 'red';
    default:
      return 'gray';
  }
};

export { mapStatus, mapStatusColor };
