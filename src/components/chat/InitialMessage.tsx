import SupplierHelp from "./SupplierHelp";

const InitialMessage = ({ handleInputChange }: { handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center pb-32">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">
                    AI PII Finder
                </h1>
                <SupplierHelp handleInputChange={handleInputChange} />
            </div>
        </div>
    )
}

export default InitialMessage;