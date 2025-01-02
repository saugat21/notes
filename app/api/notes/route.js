
import connectDB from "@/utils/db";
import Note from "@/models/Note";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req) {
    await connectDB();

    //user session check garne
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return new Response(JSON.stringify({
                message: "Unauthorized! please log in to post a note"
            }), { status: 401 })
        }
        const { name, description, image, pdf, tags } = await req.json();
        const newNote = new Note({
            name,
            description,
            image,
            pdf,
            tags,
            user: session.user.id
        });
        await newNote.save();
        return new Response(JSON.stringify({
            message: "Note Created Successfully"
        }), { status: 201 })
    } catch (error) {
        console.error("Error creating note:", error);
        return new Response(
            JSON.stringify({ message: "Error creating note", error }),
            { status: 500 }
        );
    }
}

export async function GET(){
    await connectDB();
    try {
         const notes= await Note.find({});
        return new Response(JSON.stringify({ success: true, data: notes }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: 'Failed to fetch notes' }), {
            status: 500,
        });
    }
}
