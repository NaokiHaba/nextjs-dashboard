'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { param } from "ts-interface-checker"

export default function Search({placeholder}: { placeholder: string }) {
    // React Router内でクエリパラメーター（URLの ?query=param 形式）を取得・変更するためのフック
    const searchParams = useSearchParams()

    // React Router内で現在のパスを取得するためのフック
    const pathname = usePathname()

    // ユーザが現在位置しているwebページのパス（ドメイン名の後の部分、例：www.example.com/path/name）を返します
    const {replace} = useRouter()

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);

        // 検索パラメーター (URLのクエリストリング部分の値) を操作するためのオブジェクト
        const params = new URLSearchParams(searchParams)
        params.set("page", "1")

        if (term) {
            // URLのクエリストリング部分の値を変更
            params.set("query", term)
        } else {
            // URLのクエリストリング部分の値を削除
            params.delete("query")
        }

        replace(`${pathname}?${params.toString()}`)

    }, 300)

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
            />
            <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
        </div>
    );
}
