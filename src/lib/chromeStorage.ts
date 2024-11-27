export class WeatherStorageManager {
	private static STORAGE_KEY = 'weatherHistory';
	private static MAX_ENTRIES = 5;

	// Retrieve current weather history
	private static async getHistory(): Promise<StoredEntry[]> {
		return new Promise((resolve) => {
			chrome.storage.local.get(this.STORAGE_KEY, (result) => {
				// Return existing history or empty array
				const history = result[this.STORAGE_KEY] || [];
				resolve(history);
			});
		});
	}

	static async saveData(cityName: string): Promise<void> {
		try {
			// Get current history
			const history = await this.getHistory();

			// Remove existing entry for this city if it exists
			const filteredHistory = history.filter((entry) => entry.cityName !== cityName);

			// Create new entry
			const newEntry: StoredEntry = {
				cityName
			};

			// Add new entry to the start of the array
			const updatedHistory = [newEntry, ...filteredHistory];

			// Trim to max entries
			const trimmedHistory = updatedHistory.slice(0, this.MAX_ENTRIES);

			// Save to storage
			return new Promise((resolve, reject) => {
				chrome.storage.local.set({ [this.STORAGE_KEY]: trimmedHistory }, () => {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);
						return;
					}
					resolve();
				});
			});
		} catch (error) {
			console.error('Error saving weather data:', error);
			throw error;
		}
	}

	static async getAllEntries(): Promise<StoredEntry[]> {
		return this.getHistory();
	}

	// Clear all stored weather data
	static async clearHistory(): Promise<void> {
		return new Promise((resolve, reject) => {
			chrome.storage.local.remove(this.STORAGE_KEY, () => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
					return;
				}
				resolve();
			});
		});
	}
}
