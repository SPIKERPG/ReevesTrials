/*
========================================
SPIKE Shared Partial Loader
========================================

Features:
- GitHub Pages compatible
- No backend required
- Uses fetch()
- Multi-block support
- Error handling
- Lightweight
- Static HTML compatible

========================================
*/

async function loadPartial(targetId, path) {
    const target = document.getElementById(targetId);

    if (!target) {
        console.warn(`[SPIKE] Missing target element: ${targetId}`);
        return;
    }

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();

        target.innerHTML = html;

    } catch (error) {

        console.error(
            `[SPIKE] Failed to load partial: ${path}`,
            error
        );

        target.innerHTML = `
            <section class="rule-block load-error">
                <div class="rb-title">
                    LOAD ERROR
                </div>

                <p>
                    Failed to load:
                </p>

                <code>${path}</code>
            </section>
        `;
    }
}

/*
========================================
Load Multiple Partials
========================================

Usage:

loadPartials([
    {
        id: 'rest-rules',
        path: './partials/rest_rules.html'
    },
    {
        id: 'spike-save',
        path: './partials/spike_save.html'
    }
]);

========================================
*/

function loadPartials(partials) {

    if (!Array.isArray(partials)) {
        console.error(
            '[SPIKE] loadPartials requires an array.'
        );
        return;
    }

    partials.forEach(partial => {

        if (!partial.id || !partial.path) {
            console.warn(
                '[SPIKE] Invalid partial config:',
                partial
            );
            return;
        }

        loadPartial(partial.id, partial.path);
    });
}
