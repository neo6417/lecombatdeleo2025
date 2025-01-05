export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];

  startMeasure(name: string): () => void {
    const start = performance.now();
    
    return () => {
      const duration = performance.now() - start;
      this.metrics.push({
        name,
        duration,
        timestamp: Date.now()
      });
    };
  }

  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  getAverageLoadTime(): number {
    const loadTimes = this.metrics
      .filter(m => m.name === 'pageLoad')
      .map(m => m.duration);
    
    if (loadTimes.length === 0) return 0;
    return loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;
  }

  getAverageQueryTime(): number {
    const queryTimes = this.metrics
      .filter(m => m.name.startsWith('query:'))
      .map(m => m.duration);
    
    if (queryTimes.length === 0) return 0;
    return queryTimes.reduce((a, b) => a + b, 0) / queryTimes.length;
  }
}

export const performanceMonitor = new PerformanceMonitor();