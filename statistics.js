export const Statistics = new (class {
  readonly URL = 'https://www.smogon.com/stats/';

  /**
   * Given the HTML page returned from querying the Statistics.URL, returns the most recent
   * date stats are available for. This should usually be the beginning of the current month,
   * but this approach is more robust due to timezone differences and delays in publishing.
   */
  latest(page: string): string {
    const lines = page.split('\n');
    let i = lines.length;
    while (i--) {
      const line = lines[i];
      if (line.startsWith('<a href=')) {
        return line.slice(9, 16);
      }
    }
    throw new Error('Unexpected format for index');
  }