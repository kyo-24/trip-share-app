export type tripDataProps = {
    id: number;
    title: string;
    destination: string;
    budget: number | null;
    description: string | null;
    startDate: Date;
    endDate: Date;
    coverImageUrl: string | null;
    ownerId: number;
    owner: {
        id: number;
        clerkId: string;
        name: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
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
