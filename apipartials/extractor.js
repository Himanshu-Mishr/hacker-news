const read = require('node-readability');
module.exports = function (request, response) {

    read(request.body.url, function (error, article, meta) {

        if (error) {
            response.status(400).send({
                status: "error",
                data: error
            })
        } else {
            let content = article.content;
            let title = article.title;
            // Close article to clean up jsdom and prevent leaks
            article.close();

            response.status(200).send({
                title: title,
                content: content
            });
        }
    });
}