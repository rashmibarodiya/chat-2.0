

export default function Gender() {
    return (
        <div className="flex ">
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text mr-1 text-gray-100">Female</span>
                    <input type="checkbox" defaultChecked className="checkbox text-gray-100" />
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text mr-1 text-gray-100">Male</span>
                    <input type="checkbox" defaultChecked className="checkbox text-gray-100" />
                </label>
            </div>
        </div>
    )
}