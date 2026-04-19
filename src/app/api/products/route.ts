import { getDb } from "@/lib/db";
import { NextRequest } from "next/server";

type RequestProductsParams = {
    categories?: ('kitchen' | 'common' | 'bar')[],
}

export const POST = async (request: NextRequest) => {
    const body: RequestProductsParams = await request.json() || {}
    const categories = body.categories

    const db = getDb()

    
}