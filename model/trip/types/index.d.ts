export type tripDataProps = {
    id: number;
    title: string;
    destination: string;
    budget: number | null;
    description: string | null;
    startDate: Date;
    endDate: Date;
    originalFileName: string | null;
    fileName: string | null;
    ownerId: number;
    owner: {
        id: number;
        clerkId: string;
        name: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
    photos: Photo[];
};

export type ScheduleItem = {
    id: number;
    tripId: number;
    date: Date;
    startTime: Date;
    endTime: Date;
    title: string;
    description: string;
};

export type Photo = {
    id: number;
    tripId: number;
    userId: number;
    fileName: string;
    originalName: string;
    description: string | null;
    uploadedAt: Date;
};
