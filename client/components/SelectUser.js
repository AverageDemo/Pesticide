import { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { API_URL } from "@/config/index"
import { useRouter } from "next/router"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function SelectUser({ bug, token, people }) {
    const router = useRouter()

    const assignedUser =
        bug.assigned && bug.assigned._id
            ? people.find((p) => p._id === bug.assigned._id)
            : null

    const [selected, setSelected] = useState(assignedUser)

    const assignUser = async (assignUser) => {
        setSelected(assignUser)

        const res = await fetch(`${API_URL}/bugs/${bug.slug}/assign`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ assigned: assignUser }),
        })

        if (res.ok) {
            router.reload()
        }
    }

    return (
        <Listbox value={selected} onChange={assignUser}>
            {({ open }) => (
                <>
                    <div className="inline-flex justify-center">
                        <Listbox.Button className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm ml-2 px-4 py-2 bg-green-600 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <span className="block truncate">
                                {selected ? selected.name : "Assign to user"}
                            </span>
                            <SelectorIcon
                                className="-mr-1 ml-2 h-5 w-5"
                                aria-hidden="true"
                            />
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                static
                                className="absolute z-10 mt-12 mr-20 w-60 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                                {people.map((person) => (
                                    <Listbox.Option
                                        key={person._id}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? "text-white bg-indigo-600"
                                                    : "text-gray-900",
                                                "cursor-default select-none relative py-2 pl-3 pr-9"
                                            )
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <img
                                                        src={person.avatar}
                                                        alt=""
                                                        className="flex-shrink-0 h-6 w-6 rounded-full"
                                                    />
                                                    <span
                                                        className={classNames(
                                                            selected
                                                                ? "font-semibold"
                                                                : "font-normal",
                                                            "ml-3 block truncate"
                                                        )}
                                                    >
                                                        {person.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? "text-white"
                                                                : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
