export class Blog {
    blogId: string;
    bTitle: string;
    bStory: string;
    readTime: string;
    bImage;
    imgPath: string;
    userId?: string;



    constructor(blogId: string, bTitle: string, bStory: string, readTime: string,
                bImage, userId?: string) {
        this.blogId = blogId
        this.bTitle = bTitle
        this.bStory = bStory
        this.readTime = readTime
        this.bImage = bImage
        this.userId = userId;
    }
}