import React, { useEffect, useRef } from 'react';

const ChatScroller = props => {
    const ref = useRef();
    const shouldScrollRef = useRef(true);

    useEffect(() => {
        if (shouldScrollRef.current) {
            const node = ref.current;
            node.scrollTop = node.scrollHeight;
        };
    });

    const handleScroll = () => {
        const node = ref.current;
        const { scrollTop, scrollHeight, clientHeight } = node;
        const isAtBottom = scrollHeight === clientHeight + scrollTop;
        shouldScrollRef.current = isAtBottom;
    };

    return <div {...props} ref={ref} onScroll={handleScroll} />
};

export default ChatScroller;