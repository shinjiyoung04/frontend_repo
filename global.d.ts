export {};

declare global {
  interface EthereumProvider {
    isMetaMask?: boolean;
    request<T = unknown>(
      args: { method: string; params?: unknown[] | object }
    ): Promise<T>;
    on?(eventName: string, handler: (...args: any[]) => void): void;
    removeListener?(eventName: string, handler: (...args: any[]) => void): void;
  }

  interface Window {
    ethereum?: EthereumProvider;
  }
}
