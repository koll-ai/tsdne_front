import React, { Component } from 'react';

class ArchiveRedirect extends Component {
    state = {
        content: '' // assuming there's a reason for 'content' in state, though it's not used in the provided snippet
    };

    componentDidMount() {
        this.redirectAfterDelay();
    }

    redirectAfterDelay = async () => {
        await new Promise(r => setTimeout(r, 500));

        window.requestAnimationFrame(() => {
            // Check if URL contains a "#"
            if (window.location.href.includes("#")) {
                let scpid = window.location.href.split("#")[1];
                window.location.href = `/entity?n=${scpid}`;
            } else {
                window.location.href = `/`;
            }
        });
    }

    render() {
        // Render method here. Assuming there's some placeholder content while waiting for redirect.
        return (
            <div>Redicrecting...</div>
        );
    }
}

export default ArchiveRedirect;