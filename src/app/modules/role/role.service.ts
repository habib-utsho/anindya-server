import { prisma } from "../../../lib/prisma";


const createRole = async (payload: any) => {
    const result = prisma.role.create({
        data: { ...payload, createdAt: new Date() }
    });
    return result;
}

const getRoles = async (query: any) => {
    const parsedQuery: any = {};
    if (query.searchTerm) {
        parsedQuery.OR = [
            { name: { contains: query.searchTerm, mode: 'insensitive' } },
            { description: { contains: query.searchTerm, mode: 'insensitive' } }
        ]
    }

    const filterableFields = ['name', 'description'];
    filterableFields.forEach(field => {
        if (query[field]) {
            parsedQuery[field] = query[field];
        }
    })

    const page = Math.max(1, parseInt(query.page as string) || 1);
    const limit = Math.max(1, parseInt(query.limit as string) || 10);
    const skip = (page - 1) * limit;


    const [total, result] = await prisma.$transaction([
        prisma.role.count({
            where: parsedQuery
        }),
        prisma.role.findMany({
            where: parsedQuery,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        })
    ])

    return { result, meta: { total, page, totalPage: Math.ceil(total / limit), limit } };
}
export const roleServices = { createRole, getRoles }