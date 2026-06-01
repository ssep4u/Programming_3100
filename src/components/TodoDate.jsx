export default function TodoDate() {
    const currentDate = new Date();
    const displayDate = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

    return (
        <p className="todo__date--header">오늘 날짜: {displayDate}</p>
    );
}
