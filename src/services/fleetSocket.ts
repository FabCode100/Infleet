import { Socket } from 'phoenix';

const SOCKET_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:4000/socket';

class FleetSocket {
  private socket: Socket;
  private channel: any;

  constructor() {
    this.socket = new Socket(SOCKET_URL, {
      params: { token: 'guest' },
    });
  }

  connect() {
    this.socket.connect();
    this.channel = this.socket.channel('fleet:all', {});

    this.channel
      .join()
      .receive('ok', () => console.log('Joined fleet:all channel!'))
      .receive('error', (resp: any) => console.log('Unable to join', resp));

    return this.channel;
  }

  onTelemetry(callback: (data: any) => void) {
    if (!this.channel) return;
    this.channel.on('new_telemetry', callback);
  }

  onAlert(callback: (data: any) => void) {
    if (!this.channel) return;
    this.channel.on('speed_alert', callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const fleetSocket = new FleetSocket();
