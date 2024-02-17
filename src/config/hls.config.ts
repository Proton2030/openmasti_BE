const hlsOptions = {
    hls_list_size: 0,
    hls_time: 10,
};
  
export const hlsOptionStrings = Object.entries(hlsOptions).reduce<string[]>(
    (acc, [key, value]) => acc.concat(`-${key}`, String(value)),
    []
);
  