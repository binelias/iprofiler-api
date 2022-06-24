const handleApiCall = (req, res) => {
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": "binray",
            "app_id": "iProfiler"
        },
        "inputs": [
            {
                "data": {
                    "image": {
                    "url": req.body.input
                    }
                }
            }
        ]
    });

    fetch("https://api.clarifai.com/v2/models/face-detection/versions/45fb9a671625463fa646c3523a3087d5/outputs", {
        method: "POST",
        headers: {
                Accept: "application/json",
                Authorization: 'Key a13ffff405e243a99bde0d98a85e6170'
            },
            body:raw,
    })
    .then(res => res.text())
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
};