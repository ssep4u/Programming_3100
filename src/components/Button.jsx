function Button(props) {                    //부모 컴포넌트에서 넘겨주는 속성들(className, type, children)
    const { children, ...rest } = props;    //children은 텍스트영역에 빼고, 나머지는 그대로 속성으로 넣자
    return (
        <button {...rest}>{children}</button>
    )
}
export default Button;