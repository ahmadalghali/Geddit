async function addArtificialDelay(seconds: number) {
  return await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export { addArtificialDelay };
