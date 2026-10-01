export default function EditBlogLoading() {
    return (
        <div className="min-h-screen sns-admin-root flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-[#dfbf80]/30 border-t-[#dfbf80] animate-spin" />
            <div className="sns-admin-eyebrow text-[#dfbf80] text-xs">Opening Story Editor…</div>
        </div>
    );
}
