function buildRedirectUrl(destinationUrl, label) {
    const params = new URLSearchParams({ to: destinationUrl });

    if (label) {
        params.set('label', label);
    }

    return `/redirect.html?${params.toString()}`;
}

function shouldInterceptLink(anchor, event) {
    if (!(anchor instanceof HTMLAnchorElement)) {
        return false;
    }

    if (anchor.hasAttribute('download')) {
        return false;
    }

    if (event.defaultPrevented || event.button !== 0) {
        return false;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return false;
    }

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return false;
    }

    try {
        const url = new URL(anchor.href, window.location.href);
        return url.origin !== window.location.origin && (url.protocol === 'http:' || url.protocol === 'https:');
    } catch {
        return false;
    }
}

document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a');

    if (!shouldInterceptLink(anchor, event)) {
        return;
    }

    event.preventDefault();

    const destinationUrl = anchor.href;
    const label = anchor.textContent.trim() || new URL(destinationUrl).hostname;
    window.location.href = buildRedirectUrl(destinationUrl, label);
});