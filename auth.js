(function () {
    const STORAGE_KEY = 'originova_auth';
    const LOGIN_PAGES = ['index.html', 'login.html'];
    const ENTRY_PAGE = 'index.html';
    const HOME_PAGE = 'home.html';

    function getCurrentPage() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1];

        if (!lastSegment || !lastSegment.includes('.')) {
            return ENTRY_PAGE;
        }

        return lastSegment;
    }

    function readSession() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            return null;
        }
    }

    function isAuthenticated() {
        const session = readSession();
        return Boolean(session && session.isAuthenticated);
    }

    function login(payload) {
        const sessionData = {
            isAuthenticated: true,
            username: payload.username,
            loginAt: new Date().toISOString()
        };

        sessionStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);

        const targetStorage = payload.remember ? localStorage : sessionStorage;
        targetStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));

        return sessionData;
    }

    function logout() {
        sessionStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);
    }

    function getPostLoginRedirect() {
        const params = new URLSearchParams(window.location.search);
        const requestedPath = params.get('returnTo');

        if (!requestedPath) {
            return HOME_PAGE;
        }

        const normalizedRequestedPath = requestedPath.split('?')[0].split('#')[0];
        if (LOGIN_PAGES.some((page) => normalizedRequestedPath.includes(page))) {
            return HOME_PAGE;
        }

        return requestedPath;
    }

    function requireAuth() {
        const currentPage = getCurrentPage();

        if (LOGIN_PAGES.includes(currentPage)) {
            return;
        }

        if (!isAuthenticated()) {
            const currentLocation = `${currentPage}${window.location.search || ''}${window.location.hash || ''}`;
            const redirectTarget = `${ENTRY_PAGE}?returnTo=${encodeURIComponent(currentLocation)}`;
            window.location.replace(redirectTarget);
        }
    }

    window.OriginovaAuth = {
        storageKey: STORAGE_KEY,
        login,
        logout,
        isAuthenticated,
        getSession: readSession,
        getPostLoginRedirect,
        requireAuth,
        entryPage: ENTRY_PAGE,
        homePage: HOME_PAGE
    };

    requireAuth();
})();
