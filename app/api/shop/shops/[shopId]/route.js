import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConnectToDatabase from "@/lib/connect";
import shopModel from "@/models/shop.model";
import formidable from "formidable";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Readable } from 'stream'

function parseReq(req) {
    let form = formidable({ keepExtensions: true, maxFileSize: 5 * 1024 * 1024 });
    const nodeStream = Readable.fromWeb(req.body);

    const nodeReq = Object.assign(nodeStream, {
        headers: Object.fromEntries(req.headers),
        method: req.method,
        url: req.url
    })

    return new Promise((reject, resolve) => {
        form.parse(nodeReq, (err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })
        })
    })

}
export async function GET(req, { params }) {
    const session = await getServerSession(authOptions);
    const { shopId } = await params;

    if (!session || !session.user.isSeller) {
        return NextResponse.json({ error: "not Authorized" }, { status: 501 })
    }

    try {
        let shop = await shopModel.findById(shopId)
            .populate('owner', '_id name')
            .exec()
        if (!shop) {
            return NextResponse.Json({
                error: "Shop not found"
            })
        }
        return NextResponse.json({ data: shop, message: "shop successfully retrieved" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 501 })
    }
}

export async function PUT(req, { params }) {
    await ConnectToDatabase();
    const session = await getServerSession(authOptions)
    const { shopId } = await params;
    if (!session || !session.user.isSeller) {
        return NextResponse.json({ error: "User not Authorized" }, { status: 401 })
    }


    const { fields, files } = parseReq(req);


    const isSameImage = euser.image &&
        euser.image.original_filename === photo.originalFilename &&
        parseInt(euser.image.bytes) === photo.size;
    console.log('efnam', euser.image.original_filename === photo.originalFilename)
    console.log('ebytes', parseInt(euser.image.bytes) === photo.size)
    let imageUrl = euser.image.url
    let imagePubId = euser.image.public_id

    console.log('photo', isSameImage)
    if (!isSameImage) {
        if (euser?.image?.publicId) {
            deleteCloudImage(euser.image.publicId)
        }
        const result = await uploadToCloud(files, '/user/profilespic/');

        imageUrl = result.secure_url;
        imagePubId = result.public_id
    }

}

export async function DELETE(req, { params }) {
    await ConnectToDatabase()
    const session = await getServerSession(authOptions)
    const { shopId } = await params;
    if (!session || !session.user.isSeller) {
        return NextResponse.json({ error: "User not Authorized" }, { status: 401 })
    }
    console.log('shopId',shopId)
    let shop = await shopModel.findById(shopId).populate('owner', '_id name')
    if (!shop) {
        return NextResponse.json({ error: "Shop not found" }, { status: 400 })
    }
    if (shop.owner._id.toString() != session.user.id) {
        return NextResponse.json({ error: "user not Authorized" }, { status: 401 })
    }
    console.log('well the error is here ')
   //await shopModel.findByIdAndDelete(shopId)

   return NextResponse.json({message:"Shop deleted successfully"},{status:200})

}