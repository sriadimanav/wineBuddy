export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const handleAsyncOperation = async <T>(
  operation: () => Promise<T>,
  errorMessage: string,
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error(errorMessage, error);
    throw new Error(errorMessage);
  }
};
