import { useMemo } from 'react';

export function TodoProgress({ todos }) {
    const progress = useMemo(() => {
        const completedCount = todos.filter((todo) => todo.isCompleted).length;
        const progressValue = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;
        return progressValue;
    }, [todos]);

    return (
        <div className='todo__progress'>
            <h3 className='todo__progress-title'>진행률: {Math.round(progress)}%</h3>
            <div className='todo__progress-bar'>
                <div className='todo__progress-bar-fill' style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}