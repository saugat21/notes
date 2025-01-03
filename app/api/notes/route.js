
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

//upated views incrementing it
export async function PATCH(req) {
    await connectDB();
    try {
        const { noteId } = await req.json();
        if (!noteId) {
            return new Response(JSON.stringify({ success: false, error: 'Note ID is required' }), {
                status: 400,
            });
        }
        const updatedViews = await Note.findByIdAndUpdate(
            noteId,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!updatedViews) {
            return new Response(JSON.stringify({ success: false, error: 'Note not found' }), {
                status: 404,
            });
        }
        return new Response(JSON.stringify({ success: true, data: updatedViews }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: 'Failed to update view count' }), {
            status: 500,
        });
    }
}

// for searching the notes if user not perfom search then show 4 notes with highest view else filtered content
export async function GET(req) {
    await connectDB();
    try {
        const { search } = Object.fromEntries(new URL(req.url).searchParams);
        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: "i" } }, 
                    { description: { $regex: search, $options: "i" } }, 
                    { tags: { $regex: search, $options: "i" } }, 
                ],
            }
            : {};
        const notes = search
            ? await Note.find(query) // If there's a search, apply the filter without limit
            : await Note.find(query).sort({ views: -1 }).limit(4); 

        return new Response(JSON.stringify({ success: true, data: notes }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: "Failed to fetch notes" }), {
            status: 500,
        });
    }
}
