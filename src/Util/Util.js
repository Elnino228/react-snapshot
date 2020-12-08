export function genImageUrl(data) {
    let farm = data.farm;
    let server = data.server;
    let id = data.id;
    let secret = data.secret;
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
}