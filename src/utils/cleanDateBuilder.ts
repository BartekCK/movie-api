const newCleanDateBuilder = (argDate: Date): Date => {
    const date: Date = new Date(argDate);
    date.setDate(1);
    date.setUTCHours(0, 0, 0, 0);
    return date;
};

export default newCleanDateBuilder;
