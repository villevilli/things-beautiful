/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    let thing;

    await fetch('http://espoonkopsu.fi:8020/data/things/?')
        .then(response => response.json())
        .then(data => thing = data.things[Math.floor(Math.random()*data.things.length)])

    return{
        body: thing
    }
}