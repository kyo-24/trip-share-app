export type tripDataProps = {
    title: string;
    coverImage: string;
    startDate: Date;
    endDate: Date;
    description: string;
    tags: string[];
    participants: string[];
};

export type scheduleDataProps = {
    id: number;
    day: string;
    items: {
        time: string;
        title: string;
        description: string;
    }[];
};
