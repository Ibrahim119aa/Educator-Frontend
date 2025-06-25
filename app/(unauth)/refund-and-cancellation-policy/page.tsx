/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const RefundAndCancellationPolicyPage = () => {
    return (
        <div className="container p-5">
        <Card>
            <CardHeader>
                <h1 className="text-2xl font-semibold leading-none tracking-tight">Refund and Cancellation Policy</h1>
                </CardHeader>
            <CardContent className="space-y-5">
                <ol className="space-y-10 [&>*]:space-y-2">
                    <li>
                        <h2 className="text-lg font-semibold leading-none tracking-tight">Introduction</h2>
                        <p>At OmniFriend EAppointment PVT. LTD, we are committed to providing high-quality verification and onboarding services for teachers. To ensure transparency and clarity, we have established the following refund and cancellation policy.</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold leading-none tracking-tight">Verification Process</h2>
                        <p>Once a teacher submits an application for verification, our team initiates a thorough verification and onboarding process. This includes, but is not limited to, background checks, qualification assessments, and other necessary evaluations.</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold leading-none tracking-tight">Refund Policy</h2>
                        <p>Due to the nature of our services, we have a strict no-refund policy:</p>
                        <ul className="space-y-2 list-outside list-disc px-5">
                            <li><b>Non-refundable Fees:</b> All fees paid for the verification and onboarding process are non-refundable. This policy is in place because the verification process incurs costs and resources from the moment the application is submitted.</li>
                            <li><b>Completed Verification:</b> Once a teacher has been successfully verified and onboarded, no refunds will be issued under any circumstances.</li>
                        </ul>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold leading-none tracking-tight">Cancellation Policy</h2>
                        <p>We understand that there may be instances where a teacher wishes to cancel their application. However, please note the following:</p>
                        <ul className="space-y-2 list-outside list-disc px-5">
                            <li><b>Cancellation Before Verification:</b> If a teacher decides to cancel their application before the verification process begins, they may be eligible for a partial refund. This partial refund will be at the sole discretion of OmniFriend EAppointment PVT. LTD and will depend on the extent of any preliminary work already conducted.</li>
                            <li><b>Cancellation After Verification Begins:</b> If the verification process has already started, no refunds will be provided. The teacher will be responsible for the full fee, regardless of the completion status of the verification.</li>
                        </ul>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold leading-none tracking-tight">Exceptions</h2>
                        <p>There are no exceptions to this policy. We strongly encourage teachers to be certain of their intent to proceed before submitting their application and payment.</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold leading-none tracking-tight">Disputes</h2>
                        <p>In the event of any disputes regarding this policy, the decision of OmniFriend EAppointment PVT. LTD will be final and binding.</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold leading-none tracking-tight">Contact Us</h2>
                        <p>For any questions or concerns regarding this policy, please contact us by filling this <a href="/contact-us" className="underline italic text-primary">form</a></p>

                    </li>
                </ol>

            </CardContent>
        </Card>
        </div>
    );
}

export default RefundAndCancellationPolicyPage;