async function loadPartial(id, path) {
    const target = document.getElementById(id);

    if (!target) {
        console.warn(`Missing target div: ${id}`);
        return;
    }

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        target.innerHTML = html;

    } catch (err) {
        console.error(`Failed to load partial: ${path}`, err);
    }
}
