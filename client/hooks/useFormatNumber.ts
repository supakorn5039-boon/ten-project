export const FormatNumber = (values: number) => {
    return values.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? 0;
};
