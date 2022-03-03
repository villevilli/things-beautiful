/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    let network

    await fetch('http://espoonkopsu.fi:8020/data/network/?')
        .then(response => response.json())
        .then(data => network = data)

    return{
        body: network
    }
}