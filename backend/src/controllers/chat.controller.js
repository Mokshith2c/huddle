export const uploadFile = (req, res) => {
    console.log("uf reached");
    try{
        if(!req.file){
            return res.status(400).json({message: "No file uploaded"});
        }

        const file = req.file;
        const fileUrl = file.path || file.secure_url || `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;

        
        res.json({

            id: file.filename,
            url : fileUrl,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            uploadedBy: req.user?.username || "Guest",
            uploadedAt: new Date(),
        });
    } catch(err){
        res.status(500).json({message: "Error uploading file", error: err.message});
    }
}